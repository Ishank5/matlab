export default function handler(req, res) {
  res.setHeader("Content-Type", "text/plain");

  res.send(`format short
clear all
clc
% --- BFS Algorithm ---
% (paste EXACT content of bfs.m here)
`);
}
