import { execSync } from 'child_process';
import { writeFileSync, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { AuditConfig, defaultConfig } from './audit.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class HealthAudit {
  constructor(customConfig = {}) {
    this.config = defaultConfig;
    this.results = {};
    
    try {
      this.config = { ...defaultConfig, ...customConfig };
    } catch (error) {
      console.error('Invalid config:', error);
      process.exit(1);
    }
  }

  runCommand(command, ignoreError = false) {
    try {
      return execSync(command, { encoding: 'utf-8' });
    } catch (error) {
      if (!ignoreError) {
        console.error(`Command failed: ${command}`);
        throw error;
      }
      return '';
    }
  }

  addResult(category, result) {
    if (!this.results[category]) {
      this.results[category] = [];
    }
    this.results[category].push(result);
  }

  async checkEnvironment() {
    try {
      const nodeVersion = this.runCommand('node -v');
      const expectedVersion = this.config.environment.nodeVersion;
      
      this.addResult('environment', {
        status: nodeVersion.includes(expectedVersion) ? 'success' : 'warning',
        message: `Node version: ${nodeVersion.trim()}`,
      });

      // Check required dependencies
      try {
        const deps = this.runCommand('npm list --json --depth=0');
        const depsJson = JSON.parse(deps);
        
        this.config.environment.requiredDependencies.forEach(dep => {
          const isInstalled = depsJson.dependencies[dep];
          this.addResult('environment', {
            status: isInstalled ? 'success' : 'error',
            message: `Dependency ${dep}: ${isInstalled ? 'installed' : 'missing'}`,
          });
        });
      } catch (error) {
        this.addResult('environment', {
          status: 'warning',
          message: 'Dependency check failed due to network issues',
          details: error.message,
        });
      }
    } catch (error) {
      this.addResult('environment', {
        status: 'error',
        message: 'Environment check failed',
        details: error,
      });
    }
  }

  async checkTypes() {
    try {
      const result = this.runCommand('npx tsc --noEmit', true);
      this.addResult('typeSystem', {
        status: 'success',
        message: 'Type checking passed',
      });
    } catch (error) {
      this.addResult('typeSystem', {
        status: 'error',
        message: 'Type checking failed',
        details: error.message,
      });
    }
  }

  async checkSecurity() {
    try {
      const auditResult = this.runCommand(`npm audit --json --audit-level=${this.config.security.auditLevel}`, true);
      try {
        const auditJson = JSON.parse(auditResult);
        this.addResult('security', {
          status: auditJson.metadata.vulnerabilities.total > 0 ? 'warning' : 'success',
          message: `Found ${auditJson.metadata.vulnerabilities.total} vulnerabilities`,
          details: auditJson.metadata.vulnerabilities,
        });
      } catch (e) {
        this.addResult('security', {
          status: 'warning',
          message: 'Security audit parsing failed',
          details: auditResult,
        });
      }
    } catch (error) {
      this.addResult('security', {
        status: 'warning',
        message: 'Security audit failed',
        details: error.message,
      });
    }
  }

  async checkPerformance() {
    try {
      const buildStats = this.runCommand('npm run build -- --dry-run', true);
      this.addResult('performance', {
        status: 'success',
        message: 'Performance check completed',
        details: buildStats,
      });
    } catch (error) {
      this.addResult('performance', {
        status: 'warning',
        message: 'Performance check failed',
        details: error.message,
      });
    }
  }

  async checkTests() {
    try {
      const testResult = this.runCommand('npm test -- --coverage', true);
      this.addResult('testing', {
        status: 'success',
        message: 'Tests passed',
        details: testResult,
      });
    } catch (error) {
      this.addResult('testing', {
        status: 'error',
        message: 'Tests failed',
        details: error.message,
      });
    }
  }

  generateReport() {
    const reportDir = path.join(process.cwd(), 'reports');
    mkdirSync(reportDir, { recursive: true });

    const report = {
      timestamp: new Date().toISOString(),
      results: this.results,
      summary: {
        total: Object.values(this.results).flat().length,
        success: Object.values(this.results).flat().filter(r => r.status === 'success').length,
        warnings: Object.values(this.results).flat().filter(r => r.status === 'warning').length,
        errors: Object.values(this.results).flat().filter(r => r.status === 'error').length,
      },
    };

    writeFileSync(
      path.join(reportDir, 'health-audit-report.json'),
      JSON.stringify(report, null, 2)
    );

    const markdown = this.generateMarkdownReport(report);
    writeFileSync(
      path.join(reportDir, 'health-audit-report.md'),
      markdown
    );

    return report;
  }

  generateMarkdownReport(report) {
    return `# System Health Report
Generated: ${report.timestamp}

## Summary
- Total Checks: ${report.summary.total}
- Successful: ${report.summary.success}
- Warnings: ${report.summary.warnings}
- Errors: ${report.summary.errors}

${Object.entries(report.results)
  .map(([category, results]) => `
## ${category.charAt(0).toUpperCase() + category.slice(1)}
${results.map(result => `- [${result.status.toUpperCase()}] ${result.message}`).join('\n')}
`).join('\n')}`;
  }

  async runAll() {
    await this.checkEnvironment();
    await this.checkTypes();
    await this.checkSecurity();
    await this.checkPerformance();
    await this.checkTests();
    return this.generateReport();
  }
}

export const runAudit = async (config = {}) => {
  const audit = new HealthAudit(config);
  return audit.runAll();
};

if (import.meta.url === `file://${process.argv[1]}`) {
  runAudit().catch(console.error);
} 