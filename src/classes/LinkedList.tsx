export class Node<T> {
  value: T
  next: Node<T> | null
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}

interface ILinkedList<T> {
  insertAt: (element: T, position: number) => void;
  getSize: () => number;
  print: () => void;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private size: number;
  constructor() {
    this.head = null;
    this.size = 0;
  }

  insertAt(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index');
      return;
    } else {
      const node = new Node(element);

      // добавить элемент в начало списка
      if (index === 0) {
        node.next = this.head;
        const temp = this.head;
        this.head = node;
      } else {

        let curr = this.head;
        let currIndex = 0;

        while (curr) {
          if (currIndex === index - 1) {
            break
          } else {
            curr = curr.next;
            currIndex++;
          }
        }

        if (curr) {
          const temp = curr.next;
          curr.next = node;
          node.next = temp;
        }
      }

      this.size++;
    }
  }

  removeAt(index: number) {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index');
      return;
    } else {
      // добавить элемент в начало списка
      if (this.head) {
        if (index === 0) {
          const temp = this.head;
          this.head = null;
          this.head = temp.next;
        } else {
          let curr = this.head;
          let currIndex = 0;
          while (curr.next) {
            if (currIndex === index - 1) {
              break
            } else {
              curr = curr.next;
              currIndex++;
            }
          }
  
          if (curr.next) {
            const temp = curr.next;
            curr.next = null;
            curr.next = temp.next;
          }
        }
        this.size--;
      }

      
    }
  }

  getSize() {
    return this.size;
  }

  print() {
    let curr = this.head;
    let res = [];
    while (curr) {
      res.push(curr.value);
      curr = curr.next;
    }
    return res;
  }
}
