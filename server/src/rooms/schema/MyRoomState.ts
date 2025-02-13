import { Schema, type, MapSchema } from "@colyseus/schema";

export class Player extends Schema {
    @type("string") name: string;
    @type("number") score: number = 0;
    @type("number") xPosition: number = 0;

    constructor(name: string) {
        super();
        this.name = name;
    }
}

export class MyRoomState extends Schema {
    @type("string") mySynchronizedProperty: string = "Hello world";
    @type({ map: Player }) players = new MapSchema<Player>();
}
