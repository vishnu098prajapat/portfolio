
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted py-6 text-muted-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm">
          &copy; {currentYear} All rights reserved.
        </p>
      </div>
    </footer>
  );
}
