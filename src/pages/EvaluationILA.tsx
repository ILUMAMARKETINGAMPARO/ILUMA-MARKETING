import React from 'react';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import EvaluationILA from '@/components/EvaluationILA';
import Footer from '@/components/Footer';

const EvaluationILAPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        <EvaluationILA />
      </main>
      <Footer />
    </div>
  );
};

export default EvaluationILAPage;