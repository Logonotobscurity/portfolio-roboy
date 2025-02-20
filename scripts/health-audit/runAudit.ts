const { execSync } = require('child_process');
const { writeFileSync, mkdirSync } = require('fs');
const path = require('path');
const { AuditConfig, defaultConfig } = require('./audit.config');

interface AuditResult {
  status: 'success' | 'warning' | 'error';
  message: string;
  details?: unknown;
}

class HealthAudit {
  private config = defaultConfig;
  private results: Record<string, AuditResult[]> = {};
  
  constructor(customConfig = {}) {
    this.config = AuditConfig.parse({ ...defaultConfig, ...customConfig });
  }

  private async runCommand(command: string): Promise<string> {
    try {
      return execSync(command, { encoding: 'utf-8' });
    } catch (error) {
      console.error(`Command failed: ${command}`);
      throw error;
    }
  }

  private addResult(category: string, result: AuditResult) {
    if (!this.results[category]) {
      this.results[category] = [];
    }
    this.results[category].push(result);
  }

  async checkEnvironment() {
    try {
      const nodeVersion = await this.runCommand('node -v');
      const expectedVersion = this.config.environment.nodeVersion;
      
      this.addResult('environment', {
        status: nodeVersion.includes(expectedVersion) ? 'success' : 'warning',
        message: `Node version: ${nodeVersion.trim()}`,
      });

      // Check required dependencies
      const deps = await this.runCommand('npm list --json --depth=0');
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
        status: 'error',
        message: 'Environment check failed',
        details: error,
      });
    }
  }

  async checkTypes() {
    try {
      const result = await this.runCommand('npx tsc --noEmit');
      this.addResult('typeSystem', {
        status: 'success',
        message: 'Type checking passed',
      });
    } catch (error) {
      this.addResult('typeSystem', {
        status: 'error',
        message: 'Type checking failed',
        details: error,
      });
    }
  }

  async checkSecurity() {
    try {
      const auditResult = await this.runCommand(`npm audit --json --audit-level=${this.config.security.auditLevel}`);
      const auditJson = JSON.parse(auditResult);
      
      this.addResult('security', {
        status: auditJson.metadata.vulnerabilities.total > 0 ? 'warning' : 'success',
        message: `Found ${auditJson.metadata.vulnerabilities.total} vulnerabilities`,
        details: auditJson.metadata.vulnerabilities,
      });
    } catch (error) {
      this.addResult('security', {
        status: 'error',
        message: 'Security audit failed',
        details: error,
      });
    }
  }

  async checkPerformance() {
    try {
      const buildStats = await this.runCommand('npm run build -- --dry-run');
      // Add bundle size analysis logic here
      this.addResult('performance', {
        status: 'success',
        message: 'Performance check completed',
        details: buildStats,
      });
    } catch (error) {
      this.addResult('performance', {
        status: 'error',
        message: 'Performance check failed',
        details: error,
      });
    }
  }

  async checkTests() {
    try {
      const testResult = await this.runCommand('npm test -- --coverage');
      this.addResult('testing', {
        status: 'success',
        message: 'Tests passed',
        details: testResult,
      });
    } catch (error) {
      this.addResult('testing', {
        status: 'error',
        message: 'Tests failed',
        details: error,
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

    // Generate markdown report
    const markdown = this.generateMarkdownReport(report);
    writeFileSync(
      path.join(reportDir, 'health-audit-report.md'),
      markdown
    );

    return report;
  }

  private generateMarkdownReport(report: any): string {
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
${(results as AuditResult[])
  .map(result => `- [${result.status.toUpperCase()}] ${result.message}`)
  .join('\n')}
`)
  .join('\n')}
`;
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

// Export for use in npm scripts
export const runAudit = async (config = {}) => {
  const audit = new HealthAudit(config);
  return audit.runAll();
};

// Allow running directly from command line
if (require.main === module) {
  runAudit().catch(console.error);
} 