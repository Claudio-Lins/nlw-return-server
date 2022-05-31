import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter,
    ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if (!type) {
      throw new Error("Feedback type is required");
    }

    if (!comment) {
      throw new Error("Feedback comment is required");
    }

    if (screenshot && !screenshot.startsWith('data:image')) {
      throw new Error('Invalid screenshot');
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: "Feedback submitted",
      body: [
        `<div>`,
        `<p>Tipo do feedback: ${type}!</p>`,
        `<p>Comentário: ${comment}!</p>`,
        screenshot ? `<img src="${screenshot}" />` : '',
        `</div>`,
      ].join("\n")
    });
  }
}
