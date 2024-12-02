import React from 'react';

interface Resource {
  title: string;
  description: string;
  link: string;
}

const resources: Resource[] = [
  {
    title: 'National Suicide Prevention Lifeline',
    description: '24/7 support for people in distress or crisis. Confidential and free.',
    link: 'https://suicidepreventionlifeline.org/',
  },
  {
    title: 'Mental Health America (MHA)',
    description: 'Resources for mental health screenings, support, and information.',
    link: 'https://mhanational.org/',
  },
  {
    title: 'National Alliance on Mental Illness (NAMI)',
    description: 'Provides education, advocacy, and support groups for mental health.',
    link: 'https://www.nami.org/Home',
  },
  {
    title: '7 Cups of Tea',
    description: 'Free, anonymous online chat with trained listeners for emotional support.',
    link: 'https://www.7cups.com/',
  },
  {
    title: 'Headspace',
    description: 'Guided meditation and mindfulness exercises for mental health and wellness.',
    link: 'https://www.headspace.com/',
  },
];

const MentalHealthResources: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Mental Health Wellness Resources</h1>
      <p>Here are some helpful resources for mental health support and wellness:</p>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {resources.map((resource, index) => (
          <li key={index} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
            <h2 style={{ fontSize: '1.2em', margin: 0 }}>{resource.title}</h2>
            <p style={{ margin: '5px 0' }}>{resource.description}</p>
            <a href={resource.link} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff' }}>
              Visit Website
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MentalHealthResources;
