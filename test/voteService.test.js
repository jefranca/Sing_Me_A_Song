import * as sut from "../src/services/votesService.js";
import SongNotFound from "../src/errors/SongNotFound.js";
import * as votesRepository from "../src/repositories/votesRepository.js";

describe("postVote", () => {
  it("throws SongNotFound for undefined score", async () => {
    jest.spyOn(votesRepository, "getScore").mockReturnValueOnce(undefined);
    const result = sut.postVote("id", false);
    await expect(result).rejects.toThrowError(SongNotFound);
  });

  it("resolves when id is valid and isUpvote is false", async () => {
    jest.spyOn(votesRepository, "deleteSong").mockImplementationOnce(() => {return});
    jest.spyOn(votesRepository, "postVote").mockImplementationOnce(() => {
      throw new Error();
    });
    jest.spyOn(votesRepository, "getScore").mockReturnValueOnce(-5);
    sut.postVote("id", false);
    await expect(result).resolves;
  });

  it("resolves when id is valid and isUpvote is true", async () => {
    jest.spyOn(votesRepository, "deleteSong").mockImplementationOnce(() => {
      throw new Error();
    });
    jest.spyOn(votesRepository, "postVote").mockImplementationOnce(() => {return});
    jest.spyOn(votesRepository, "getScore").mockReturnValueOnce(5);
    const result = sut.postVote("id", true);
    await expect(result).resolves;
  });
});

//votesRepository.getScore(id)
