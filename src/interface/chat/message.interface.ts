export interface IMessage {
  threadId?: string; // Có thể undefined nếu là user mới gửi lần đầu
  senderId: string;
  content: string;

}