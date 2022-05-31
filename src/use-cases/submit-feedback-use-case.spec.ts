import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailkSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailkSpy }
);

describe("Submit feedback", () => {
  it("should be able to submit feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "bug",
        comment: "Exemplo bug",
        screenshot: "data:image/screenshot.png",
      })
    ).resolves.not.toThrow();
    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailkSpy).toHaveBeenCalled();
  });

  it("should not be able to submit feedback without type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "Exemplo bug",
        screenshot: "data:image/screenshot.png",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit feedback without a comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/screenshot.png",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit feedback without a screenshot", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "Comment",
        screenshot: "123",
      })
    ).rejects.toThrow();
  });
});
