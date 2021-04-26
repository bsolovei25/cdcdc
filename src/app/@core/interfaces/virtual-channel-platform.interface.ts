import { VirtualChannel } from '@shared/classes/virtual-channel.class';

// Использовать совместно с VirtualChannel
export interface IVirtualChannelPlatform {
    // Реализовать метод удаления всех используемых виртуальных каналов
    disposeVirtualChannels<U>(virtualChannels: VirtualChannel<U>[]): void;
}
