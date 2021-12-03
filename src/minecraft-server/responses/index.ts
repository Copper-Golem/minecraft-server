// Local Imports
import { MinecraftResponse } from './response';

export { Login, LoginEvent } from './login';

export { Logout, LogoutEvent } from './logout';

export { Achievement, AchievementEvent } from './achievement';

export { Chat, ChatEvent } from './chat';

export { ConsoleResponse } from './console';

export interface PlayerEvent {
  player: string;
}

export interface ConsoleEvent {

}

export default MinecraftResponse;
