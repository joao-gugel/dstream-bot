import { Server } from "socket.io";
import { MAX_LIST_MESSAGES_LENGTH } from "../config/max-list-messages-length";

type Message = {
    userId: string;
    userAvatar: string;
    userDisplayName: string;
    messageContent: string;
};

export interface SocketService {
    pushMessages: (message: Message) => void;
    sendMessages: () => void;
    clearMessages: () => void;
}

class DiscordSocketService implements SocketService {
    private io: Server;
    private messages: Message[] = [];

    constructor(socketService: Server) {
        this.io = socketService;

        this.eventsMapper();
    }

    pushMessages(message: Message) {
        if (this.messages.length === MAX_LIST_MESSAGES_LENGTH) this.messages.shift();

        this.messages.push(message);
    }

    sendMessages() {
        this.io.emit("message", this.messages);
    }

    clearMessages() {
        this.messages = [];
    }

    private eventsMapper() {
        this.io.on("connection", (socket) => {
            console.log("The web client is connected");
        });

        this.io.on("disconnect", () => {
            console.log("The web client is disconnected");
        });
    }
}

export { DiscordSocketService };
