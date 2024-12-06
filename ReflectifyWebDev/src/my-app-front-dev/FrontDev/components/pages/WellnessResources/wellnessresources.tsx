import React from 'react';
import './MentalHealthResources.css'

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
      <div className="container">
          <h1>Mental Health Wellness Resources</h1>
          <p>Here are some helpful resources for mental health support and wellness:</p>
          <ul className="resource-list">
              {resources.map((resource, index) => (
                  <li key={index} className="resource-item">
                      <h2 className="resource-title">{resource.title}</h2>
                      <p className="resource-description">{resource.description}</p>
                      <a
                          href={resource.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="resource-link"
                      >
                          Visit Website
                      </a>
                  </li>
              ))}
          </ul>
      </div>
  );
};

export default MentalHealthResources;
