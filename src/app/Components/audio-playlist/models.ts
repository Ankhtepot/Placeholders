export enum ETrackEventType {
  none = 0,
  play = 1,
  pause = 2,
  stop = 3,
  toEnd = 4,
  toStart = 5,
  next = 6,
  previous = 7,
}

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

export interface TrackEventData {
  index: number;
  event: ETrackEventType;
}

/* ************* Default objects ************* */

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
