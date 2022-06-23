export interface EmailSenderService {
    send(recipient: string, message: string)
}
