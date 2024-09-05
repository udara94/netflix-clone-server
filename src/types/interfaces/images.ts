export interface ImageSet {
  verticalPoster: VerticalPoster;
  horizontalPoster: HorizontalPoster;
  horizontalBackdrop: HorizontalBackDrop;
}

export interface VerticalPoster {
  w240: string;
  w360: string;
  w480: string;
  w600: string;
  w720: string;
}

export interface HorizontalPoster {
  w360: string;
  w480: string;
  w720: string;
  w1080: string;
  w1440: string;
}

export interface HorizontalBackDrop {
  w360: string;
  w480: string;
  w720: string;
  w1080: string;
  w1440: string;
}
