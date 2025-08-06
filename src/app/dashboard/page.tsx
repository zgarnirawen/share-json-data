
 
import JsonEditor from '@/components/json-editor';
import prisma from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  // Récupère l'utilisateur connecté via Clerk côté serveur
  const user = await currentUser();

  // Si aucun utilisateur connecté, redirige vers la page d'accueil
  if (!user) {
    redirect('/');
  }

  // Cherche l'utilisateur dans la base Prisma par son clerkUserId
  const existingUser = await prisma.user.findUnique({
    where: { clerkUserId: user.id },
  });

  // Si l'utilisateur n'existe pas en base, on le crée
  if (!existingUser) {
    await prisma.user.create({
      data: {
        clerkUserId: user.id,
        // Utilisation du nullish coalescing et trim pour éviter les espaces inutiles
        name: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim(),
        imageUrl: user.imageUrl ?? '',
        email: user.emailAddresses[0]?.emailAddress ?? '',
      },
    });
  }

  // Affiche le dashboard avec un titre, une description et le composant JsonEditor
  return (
    <section className="max-w-4xl mx-auto px-4 mt-10">
      <header className="mb-6">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground text-lg">
          Manage your data and share it with others.
        </p>
      </header>
      <JsonEditor />
    </section>
  );
}
