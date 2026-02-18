function lpp1()
%% Solve the following LPP by graphical method.
% Max Z = 3x1 + 5x2
% Subject to:
% x1 + 2x2 <= 2000
% x1 + x2  <= 1500
% x2       <= 600
% x1 >= 0, x2 >= 0
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

format short;
clc;

%% Input Parameters
C = [3 5];
A = [1 2; 1 1; 0 1];
b = [2000; 1500; 600];

%% Phase 1: Plot constraints
y = 0:1:max(b);

x21 = (b(1) - A(1,1).*y) ./ A(1,2);
x22 = (b(2) - A(2,1).*y) ./ A(2,2);
x23 = (b(3) - A(3,1).*y) ./ A(3,2);

x21 = max(x21,0);
x22 = max(x22,0);
x23 = max(x23,0);

figure;
plot(y,x21,'r', y,x22,'k', y,x23,'b','LineWidth',1.5);
xlabel('x1');
ylabel('x2');
legend('x1+2x2=2000','x1+x2=1500','x2=600');
grid on;

%% Corner points with axes
points = [
    0 0
    0 600
    900 300
    1500 0
];

%% Feasible region
PT = constraints(points);

%% Objective function
Fx = zeros(size(PT,1),1);
for i = 1:size(PT,1)
    Fx(i) = sum(PT(i,:) .* C);
end

Result = [PT Fx];

%% Optimal solution
[Zmax, idx] = max(Fx);
OPTIMAL_BFS = array2table(Result(idx,:), ...
    'VariableNames',{'x1','x2','Z'})

end

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function F = constraints(X)
x1 = X(:,1);
x2 = X(:,2);

mask = (x1 + 2*x2 <= 2000) & ...
       (x1 + x2 <= 1500) & ...
       (x2 <= 600) & ...
       (x1 >= 0) & (x2 >= 0);

F = X(mask,:);
end
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
