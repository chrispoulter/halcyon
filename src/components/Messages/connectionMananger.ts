import {
    HttpTransportType,
    HubConnection,
    HubConnectionBuilder,
    LogLevel
} from '@microsoft/signalr';
import { config } from '@/utils/config';

export class ConnectionManager {
    connection: HubConnection | null = null;

    startConnection(accessToken: string) {
        this.connection = new HubConnectionBuilder()
            .withUrl(`${config.EXTERNAL_API_URL}/messages`, {
                transport: HttpTransportType.ServerSentEvents,
                accessTokenFactory: () => accessToken,
                withCredentials: false
            })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Warning)
            .build();

        this.connection
            .start()
            .then(() =>
                console.log('Connection started', this.connection!.connectionId)
            )
            .catch(err => console.error('Error connecting', err));
    }

    addListener(method: string, callback: (...args: any[]) => void) {
        if (!this.connection) {
            return;
        }

        this.connection.on(method, callback);
    }

    removeListener(method: string, callback: (...args: any[]) => void) {
        if (!this.connection) {
            return;
        }

        this.connection.off(method, callback);
    }
}
