function uuid(n = 16) {
    let id = "";
    while (id.length < n) {
        id += Math.random().toString(16).slice(2)
    }
	return id.slice(0, n);
}

export class Event {

    listeners = {};

    subscribe(event, callback) {
        this.listeners[event] = this.listeners[event] || {};
        const listeners = this.listeners[event];
        
        const id = uuid();
        
        listeners[id] = callback;

        return {
            _callback: callback,
            callback(callback) {
                this._callback = callback;
                listeners[id] = callback;
            },
            unsubscribe() {
                if (listeners[id]) {
                    delete listeners[id];
                }
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