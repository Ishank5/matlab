export default function handler(req, res) {
  res.setHeader("Content-Type", "text/plain");

  res.send(`format short
clear all
clc

A=[2 3 -1 4;1 -2 6 -7];
C=[1 2 3 4];
b=[8 ;-3];

m=size(A,1)
n=size(A,2)

if n>m
    nCm=nchoosek(n,m);
    pair=nchoosek(1:n,m);
    optval=-inf;
    optsoln=[];
    sol = [];
    
    for i=1:nCm
        y=zeros(n,1);
        x=A(:,pair(i,:))\\b;
        
        if all(x>=0) && all(isfinite(x))
            y(pair(i,:))=x;
            val=C*y;
            sol =[sol y];
            
            if val>optval
                optval=val;
                optsoln=y;
            end
        end
    end
end

sol
optval
optsoln
`);
}
