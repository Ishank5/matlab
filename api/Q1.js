export default function handler(req, res) {
  res.setHeader("Content-Type", "text/plain");

  res.send(`A=[-1,3; 1,1;1,-1];
B=[10;6;2];

x1=0:1:max(B);

x2_1=(B(1)-A(1,1)*x1)/A(1,2);
x2_2=(B(2)-A(2,1)*x1)/A(2,2);
x2_3=(B(3)-A(3,1)*x1)/A(3,2);

x2_1=max(x2_1,0);
x2_2=max(x2_2,0);
x2_3=max(x2_3,0);

plot(x1,x2_1,'r',x1,x2_2,'g',x1,x2_3,'y');

cx1=find(x1==0);
c1=find(x2_1==0);
c2=find(x2_2==0);
c3=find(x2_3==0);

line1=[x1(:,[c1,cx1]);x2_1(:,[c1,cx1])]';
line2=[x1(:,[c2,cx1]);x2_2(:,[c2,cx1])]';
line3=[x1(:,[c3,cx1]);x2_3(:,[c3,cx1])]';

corpt=unique([line1;line2;line3],'rows');

pt=[0;0];

for i=1:size(A,1)
    A1=A(i,:);
    B1=B(i,:);
    for j=i+1:size(A,1)
        A2=A(j,:);
        B2=B(j,:);
        A4=[A1;A2];
        B4=[B1; B2];
        X=A4\\B4;
        pt=[pt X];
    end
end

ptt=pt';
allpt=[ptt;corpt];
points=unique(allpt,'rows');

feasible=[];
for i=1:size(points,1)
    x=points(i,:)';
    if all(A*x<=B) && all(x>=0)
        feasible=[feasible; x'];
    end
end

c=[5 1];
fn=zeros(size(feasible,1),1);

for i=1:size(feasible,1)
    fn(i)=feasible(i,:)*c';
end

[optval,optposition]=max(fn);

feasible(optposition,:)
optval
`);
}
