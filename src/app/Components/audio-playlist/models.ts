export interface Track {
  trackUrl: string;
  title?: string;
  artist?: string;
  thumbnailUrl?: string;
  duration?: number;
  isInvalid?: boolean;
}

export interface Playlist {
  title: string;
  thumbnailUrl?: string;
  tracks: Track[];
}

export const NULL_TRACK: Track = {
  trackUrl: '',
  title: 'unknown track',
  artist: 'unknown artist',
  thumbnailUrl: '',
  duration: 0,
  isInvalid: true,
}

export const NULL_PLAYLIST: Playlist = {
  title: 'unknown playlist',
  tracks: []
}
