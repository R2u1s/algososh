interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
  getSize: () => number;
  getAll: () => (T | null)[];
  clear: () => void;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    //условие для корректной работы выхода за пределы контейнера. Тут не используем, для схожего поведения анимации с заданием и поскольку это регулируется отключаемыми кнопками 
    //if (this.tail === this.size-1) {this.tail = 0} else {this.tail++};
    if (this.length>0) {this.tail++}
    this.container[this.tail]=item;
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    this.container[this.head]=null;
    //условие для корректной работы выхода за пределы контейнера. Тут не используем, для схожего поведения анимации с заданием и поскольку это регулируется отключаемыми кнопками
    //if (this.head === this.size-1) {this.head = 0} else {this.head++};
    if (this.length>0 && this.head !== this.size-1 && this.head !== this.tail) {this.head++}
    this.length--;
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this.container[this.head % this.size];
  };

  isEmpty = () => this.length === 0;

  getAll = ():(T | null)[] => {
    const arr = [];
    for (let i = 0; i < this.size; i++) {
      arr.push(this.container[i]);
    }
    return arr;
  }

  getSize = () => this.length;

  getHead = () => this.head;
  getTail = () => this.tail;

  clear = ():void => {
    this.container = Array(this.size);
    this.length=0;
    this.head=0;
    this.tail=0;
  }
}