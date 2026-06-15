import { Component } from '../core/GameObject';

export class AudioSource extends Component {
  clip: string | null = null;
  volume: number = 1;
  pitch: number = 1;
  loop: boolean = false;
  playOnAwake: boolean = false;
  isPlaying: boolean = false;
  private audioContext: AudioContext | null = null;
  private audioElement: HTMLAudioElement | null = null;

  awake(): void {
    if (this.playOnAwake && this.clip) {
      this.play();
    }
  }

  play(): void {
    if (!this.clip) return;

    this.audioElement = new Audio(this.clip);
    this.audioElement.volume = this.volume;
    this.audioElement.playbackRate = this.pitch;
    this.audioElement.loop = this.loop;
    this.audioElement.play();
    this.isPlaying = true;
  }

  pause(): void {
    if (this.audioElement) {
      this.audioElement.pause();
      this.isPlaying = false;
    }
  }

  stop(): void {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
      this.isPlaying = false;
    }
  }

  setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
    if (this.audioElement) {
      this.audioElement.volume = this.volume;
    }
  }
}
