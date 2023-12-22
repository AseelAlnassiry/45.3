class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let node of vertexArray) this.nodes.add(node);
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for (let adjacent of vertex.adjacent) adjacent.adjacent.delete(vertex);
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const visited = new Set();
    const res = [];
    const helper = (node) => {
      if (visited.has(node)) return;
      res.push(node.value)
      visited.add(node)
      for (let adjacent of node.adjacent) helper(adjacent);
    };

    helper(start)
    return res;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const queue = [start];
    const res = [];
    const visited = new Set();
    while (queue.length > 0) {
      let curr = queue.shift();
      if (!visited.has(curr)) {
        res.push(curr.value);
        for (let node of curr.adjacent) queue.push(node);
        visited.add(curr);
      }
    }

    return res;
  }
}

module.exports = { Graph, Node };
