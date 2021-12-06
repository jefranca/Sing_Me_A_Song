import * as sut from "../src/services/votesService.js";
import SongNotFound from "../src/errors/SongNotFound.js";
import * as votesRepository from "../src/repositories/votesRepository.js";

describe("postVote", () => {

  it("throws SongNotFound for undefined score", async () => {
    jest.spyOn(votesRepository, "getScore").mockReturnValueOnce(undefined);
    const result = sut.postVote("id", false);
    await expect(result).rejects.toThrowError(SongNotFound);
  });

  test("resolves when id is valid and isUpvote is false", async () => {
    jest.spyOn(votesRepository, "getScore").mockReturnValueOnce(-5);
    jest.spyOn(votesRepository, "deleteSong").mockImplementationOnce(() => {});
    const result = await sut.postVote({id:8}, false);
    await expect(votesRepository.deleteSong).toHaveBeenCalled();
  });

  it("resolves when id is valid and isUpvote is true", async () => {
    jest.spyOn(votesRepository, "getScore").mockReturnValueOnce(5);
    jest.spyOn(votesRepository, "postVote").mockImplementationOnce(() => {});
    const result = await sut.postVote({id:8}, true);
    await expect(votesRepository.postVote).toHaveBeenCalled();
  });
});
