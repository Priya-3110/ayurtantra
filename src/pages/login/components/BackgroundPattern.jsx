import React from 'react';

const BackgroundPattern = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Primary Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        {/* Top Left Circle */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        
        {/* Top Right Circle */}
        <div className="absolute -top-20 -right-32 w-64 h-64 bg-accent/15 rounded-full blur-2xl"></div>
        
        {/* Bottom Left Circle */}
        <div className="absolute -bottom-32 -left-20 w-72 h-72 bg-secondary/10 rounded-full blur-3xl"></div>
        
        {/* Bottom Right Circle */}
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-primary/8 rounded-full blur-3xl"></div>
        
        {/* Center Accent */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-accent/5 to-transparent rounded-full blur-xl"></div>
      </div>
      
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      
      {/* Ayurvedic Leaf Motifs */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Leaf 1 */}
        <div className="absolute top-20 left-10 w-6 h-6 text-primary/20 animate-float">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.06.66C6.16 17.74 9 14 17 12V8zm2.71-5.68l-1.42 1.42C19.54 4.99 21 7.44 21 10c0 2.56-1.46 5.01-2.71 6.26l1.42 1.42C21.05 16.34 23 13.35 23 10s-1.95-6.34-3.29-7.68z"/>
          </svg>
        </div>
        
        {/* Floating Leaf 2 */}
        <div className="absolute top-40 right-16 w-4 h-4 text-accent/25 animate-float-delayed">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.06.66C6.16 17.74 9 14 17 12V8zm2.71-5.68l-1.42 1.42C19.54 4.99 21 7.44 21 10c0 2.56-1.46 5.01-2.71 6.26l1.42 1.42C21.05 16.34 23 13.35 23 10s-1.95-6.34-3.29-7.68z"/>
          </svg>
        </div>
        
        {/* Floating Leaf 3 */}
        <div className="absolute bottom-32 left-20 w-5 h-5 text-secondary/20 animate-float-slow">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.06.66C6.16 17.74 9 14 17 12V8zm2.71-5.68l-1.42 1.42C19.54 4.99 21 7.44 21 10c0 2.56-1.46 5.01-2.71 6.26l1.42 1.42C21.05 16.34 23 13.35 23 10s-1.95-6.34-3.29-7.68z"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default BackgroundPattern;