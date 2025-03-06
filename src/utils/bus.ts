import EventEmitter from 'eventemitter3';

const bus = new EventEmitter();

export default bus;

export const BusEventType = {
    HOME: 'home'
}