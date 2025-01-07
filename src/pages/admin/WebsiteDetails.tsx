// src/pages/admin/WebsiteDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';

import { Website, MetaTag } from '../../types/marketing';
import { StatsCard } from '../../components/marketing/StatsCard';
import { websiteService } from '../../services/firebase';

const formatDate = (dateValue: any) => {
 console.log('Date value:', dateValue, 'Type:', typeof dateValue);
 
 try {
   if (typeof dateValue === 'string') {
     return new Date(dateValue).toLocaleDateString('pl-PL');
   }
   
   if (dateValue && typeof dateValue === 'object' && 'seconds' in dateValue) {
     return new Date(dateValue.seconds * 1000).toLocaleDateString('pl-PL');
   }

   return 'Data niedostępna';
 } catch (error) {
   console.error('Error formatting date:', error);
   return 'Data niedostępna';
 }
};

const WebsiteDetails: React.FC = () => {
 const { id } = useParams<{ id: string }>();
 const navigate = useNavigate();
 const [website, setWebsite] = useState<Website | null>(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);

 useEffect(() => {
   const loadWebsite = async () => {
     if (!id) return;

     try {
       setLoading(true);
       const websiteData = await websiteService.getWebsite(id);
       console.log('Website data:', websiteData); // Dodajemy log
       console.log('Created at:', websiteData?.createdAt); // Sprawdzamy pole createdAt
       setWebsite(websiteData);
     } catch (err) {
       console.error('Error loading website:', err);
       setError('Wystąpił błąd podczas ładowania danych strony');
     } finally {
       setLoading(false);
     }
   };

   loadWebsite();
 }, [id]);

 if (loading) {
   return (
     <div className="flex items-center justify-center min-h-screen">
       <div className="loading loading-spinner loading-lg"></div>
     </div>
   );
 }

 if (error || !website) {
   return (
     <div className="container mx-auto px-4 py-8">
       <Card>
         <div className="text-center">
           <h2 className="text-2xl font-bold text-red-500 mb-4">
             {error || 'Nie znaleziono strony'}
           </h2>
           <Button variant="primary" onClick={() => navigate('/pl/admin/websites')}>
             Wróć do listy
           </Button>
         </div>
       </Card>
     </div>
   );
 }

 return (
   <div className="container mx-auto px-4 py-8">
     {/* Nagłówek */}
     <div className="flex justify-between items-center mb-8">
       <div>
         <h1 className="text-3xl font-bold text-white mb-2">{website.name}</h1>
         <a 
           href={website.url} 
           target="_blank" 
           rel="noopener noreferrer" 
           className="text-blue-400 hover:text-blue-300"
         >
           {website.url}
         </a>
       </div>
       <div className="flex gap-4">
         <Button 
           variant="secondary" 
           onClick={() => navigate('/pl/admin/websites')}
         >
           Wróć
         </Button>
         <Button 
           variant="primary"
           onClick={() => navigate(`/pl/public/url-analysis-step1?url=${encodeURIComponent(website.url)}`)}
         >
           Nowa analiza
         </Button>
       </div>
     </div>

     {/* Statystyki */}
     <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
       <StatsCard
         title="Liczba odwiedzin"
         value={website.analytics?.visitors || 0}
         color="blue"
       />
       <StatsCard
         title="Współczynnik odrzuceń"
         value={`${website.analytics?.bounceRate || 0}%`}
         color="red"
       />
       <StatsCard
         title="Średni czas"
         value={website.analytics?.avgTimeOnSite || "0:00"}
         color="green"
       />
       <StatsCard
         title="Status"
         value={website.status}
         color={website.status === 'active' ? 'green' : 'yellow'}
       />
     </div>

     {/* Szczegóły strony */}
     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
       {/* Informacje podstawowe */}
       <Card>
         <h2 className="text-xl font-bold mb-4">Informacje podstawowe</h2>
         <div className="space-y-4">
           <div>
             <h3 className="text-sm text-gray-400">Opis strony</h3>
             <p className="text-white">{website.description || 'Brak opisu'}</p>
           </div>
           <div>
             <h3 className="text-sm text-gray-400">Ostatnia analiza</h3>
             <p className="text-white">
               {formatDate(website.lastAnalysis)}
             </p>
           </div>
           <div>
             <h3 className="text-sm text-gray-400">Data dodania</h3>
             <p className="text-white">
               {website.createdAt ? formatDate(website.createdAt) : 'Data niedostępna'}
             </p>
           </div>
         </div>
       </Card>

       {/* Meta tagi */}
       <Card>
         <h2 className="text-xl font-bold mb-4">Meta tagi</h2>
         <div className="space-y-3">
           {website.metaTags && website.metaTags.length > 0 ? (
             website.metaTags.map((tag: MetaTag, index: number) => (
               <div key={index} className="bg-gray-700 p-3 rounded-lg">
                 <div className="text-sm text-gray-400 mb-1">{tag.name}</div>
                 <div className="text-white">{tag.content}</div>
               </div>
             ))
           ) : (
             <p className="text-gray-400">Brak meta tagów</p>
           )}
         </div>
       </Card>
     </div>
   </div>
 );
};

export default WebsiteDetails;