export default class SongNotFound extends Error {
    constructor(message) {
      super(message);
      this.name = "SongNotFound";
    }
  }