import React from "react";
import Header from "./header";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 min-h-[80vh]">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t py-10 bg-background/50 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>
            Made with ❤️ by <strong>Jeel Patel</strong>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
