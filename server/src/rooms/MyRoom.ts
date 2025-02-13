import { Room, Client, ServerError } from "@colyseus/core";
import { MyRoomState, Player } from "./schema/MyRoomState";
import gameConfig from "../game.config";

export class MyRoom extends Room<MyRoomState> {
    maxClients = 2;

    onCreate(options: any) {
        this.setState(new MyRoomState());

        this.onMessage("type", (client, message) => {
            //
            // handle "type" message
            //
        });
    }

    onJoin(client: Client, options: any) {
        if (options.name) {
            this.state.players.set(client.sessionId, new Player(options.name));
        } else {
            client.leave();
        }
    }

    onLeave(client: Client, consented: boolean) {
        console.log(client.sessionId, "left!");
    }

    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }
}
