export class Event {

    listeners = {};

    subscribe(event, callback) {
        this.listeners[event] = this.listeners[event] || {};
        const listeners = this.listeners[event];
        
        const id = Math.random().toString(16).slice(2);
        
        listeners[id] = callback;

        return {
            _callback: callback,
            callback(callback) {
                this._callback = callback;
                listeners[id] = callback;
            },
            unsubscribe() {
                delete listeners[event][id];
            }
        };
    }

    fire(event, ...params) {
        this.listeners[event] = this.listeners[event] || {};
        for (let id in this.listeners[event]) {
            this.listeners[event][id](...params);
        }
    }

}

const event = new Event();

export default event;