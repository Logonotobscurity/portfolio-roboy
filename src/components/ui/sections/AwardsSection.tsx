import { SectionContainer } from '@/components/ui/layout/SectionContainer';
import { SectionHeader } from '@/components/ui/layout/SectionHeader';
import { SECTION_IDS } from '@/config/sections';
import { ChapterHeading } from '@/components/ui/typography/ChapterHeading';

export function AwardsSection() {
  return (
    <SectionContainer id={SECTION_IDS.LEGACY}>
      <SectionHeader
        title="Awards & Recognition"
        subtitle="Celebrating milestones and achievements in entertainment"
      />
      <div className="container mx-auto px-4">
        <ChapterHeading subtitle="Celebrating Excellence">
          Awards & Recognition
        </ChapterHeading>
        {/* ... rest of the code ... */}
      </div>
    </SectionContainer>
  );
} 