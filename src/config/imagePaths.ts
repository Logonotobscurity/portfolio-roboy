export const ImagePaths = {
  hero: {
    beast: '/images/hero/hero-beast.jpg',
    spotlight: '/images/hero/hero-.jpg'
  },
  projects: {
    performance: {
      loveStage: '/images/projects/lovethestage.jpg',
      energy: '/images/projects/energy.jpg',
      iliveforit: '/images/projects/iliveforit.jpg',
      actionShoot: '/images/projects/action-shoot.jpg',
      actionskool: '/images/projects/actionskool.jpg',
      activeAndReady: '/images/projects/activeandready.jpg',
      fortheLove: '/images/projects/forthelove.jpg'
    },
    behindTheScenes: {
      hearSoundAndDefineMonemnts: '/images/projects/ihearsoundanddefinemonemnts.jpg',
      haveAllActionOn: '/images/projects/ihaveallactionon.jpg',
      sharedMoments: '/images/projects/Isharedmoments.jpg',
      defineMoments: '/images/projects/idefinemoments.jpg',
      letsDiveIntoBusiness: '/images/projects/Letsdiveintobusiness.jpg'
    },
    featured: {
      kingRoored: '/images/projects/kingRoored.jpg',
      declacaredRoo: '/images/projects/declacaredRoo.jpg',
      kngback: '/images/projects/kngback.jpg'
    },
    events: {
      smirnoff: '/images/projects/smirnoffcallings.jpg',
      killer: '/images/projects/eventkiller.jpg',
      momentsOnStage: '/images/projects/momentsonstage.jpg',
      event: '/images/projects/event.jpg',
      ladiesLoveRoo: '/images/projects/ladiesloveRoo.jpg'
    },
    fashion: {
      killer: '/images/projects/fashionkiller.jpg',
      speaks: '/images/projects/fashionspeaks.jpg',
      pose: '/images/projects/fashionpose.jpg',
      highVogue: '/images/projects/highvogue.jpg',
      cultralswag: '/images/projects/cultralswag.jpg',
      host: '/images/projects/Fashionhost.jpg',
      fashoionornothing: '/images/projects/fashoionornothing.jpg',
      bluehead: '/images/projects/bluehead.jpg'
    },
    brands: {
      smirnoffPartnership: '/images/projects/rooforsmirnodff.jpg',
      moments: '/images/projects/madesmirnoffamoment.jpg',
      stillonsmirnoff: '/images/projects/stillonsmirnoff.jpg',
      madeHumanAsSmirnoff: '/images/projects/madehumanasmirnoff.jpg'
    },
    mc: {
      honor: '/images/projects/MChonor.jpg',
      headOfState: '/images/projects/headofstate.jpg',
      momentsWithCelebrity: '/images/projects/Momentswithcelebrity.jpg'
    },
    entertainment: {
      rooKingdom: '/images/projects/RooKingdom.jpg',
      sharingMoments: '/images/projects/Sharingmonemnts.jpg',
      birdsAreUpForMe: '/images/projects/birdsareupforme.jpg'
    },
    awards: {
      recognition: '/images/projects/Recognition.jpg',
      ceremony: '/images/projects/Awardmoments.jpg',
      speech: '/images/projects/Award-Speech.jpg'
    }
  },
  philanthropy: {
    foundation: {
      main: '/images/philantrophy/rooboy-foundation3.jpg',
      foundation: '/images/philantrophy/Rooboy-foundation.jpg'
    },
    impact: '/images/philantrophy/Philantophy.jpg',
    youthEmpowerment: '/images/philantrophy/rooboy-foundation-2.jpg'
  }
} as const;

// Images that will have grayscale effect applied
export const GRAYSCALE_IMAGES = [
  ImagePaths.projects.performance.loveStage,
  ImagePaths.projects.performance.energy,
  ImagePaths.projects.performance.iliveforit,
  ImagePaths.projects.performance.actionShoot,
  ImagePaths.projects.performance.fortheLove
]; 