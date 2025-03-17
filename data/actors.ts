import { cases } from "./cases";
import { corruptionCases } from "./corruption-cases";

export interface Actor {
  id: string;
  name: string;
  role: string;
  image?: string;
  description: string;
  cases: string[]; // Array of case IDs the actor is involved in
  connections: string[]; // Array of actor IDs this actor is connected to
}

// Extract actors from all cases
const extractActorsFromCases = () => {
  const actorsMap = new Map<string, Actor>();
  const connectionsMap = new Map<string, Set<string>>();

  // Process general cases
  cases.forEach(caseItem => {
    caseItem.keyFiguresDetails.forEach(figure => {
      const actorId = figure.name.toLowerCase().replace(/\s+/g, '-');
      
      // Create or update actor
      if (!actorsMap.has(actorId)) {
        actorsMap.set(actorId, {
          id: actorId,
          name: figure.name,
          role: figure.role,
          description: figure.description,
          cases: [caseItem.id],
          connections: []
        });
        connectionsMap.set(actorId, new Set<string>());
      } else {
        const actor = actorsMap.get(actorId)!;
        if (!actor.cases.includes(caseItem.id)) {
          actor.cases.push(caseItem.id);
        }
      }
    });

    // Create connections between actors in the same case
    const caseActorIds = caseItem.keyFiguresDetails.map(figure => 
      figure.name.toLowerCase().replace(/\s+/g, '-')
    );

    // Connect all actors in this case to each other
    caseActorIds.forEach(actorId => {
      const connections = connectionsMap.get(actorId)!;
      caseActorIds.forEach(otherId => {
        if (actorId !== otherId) {
          connections.add(otherId);
        }
      });
    });
  });

  // Process corruption cases
  corruptionCases.forEach(caseItem => {
    if (caseItem.keyFiguresDetails) {
      caseItem.keyFiguresDetails.forEach(figure => {
        const actorId = figure.name.toLowerCase().replace(/\s+/g, '-');
        
        // Create or update actor
        if (!actorsMap.has(actorId)) {
          actorsMap.set(actorId, {
            id: actorId,
            name: figure.name,
            role: figure.role,
            description: figure.description,
            cases: [`corruption-${caseItem.id}`],
            connections: []
          });
          connectionsMap.set(actorId, new Set<string>());
        } else {
          const actor = actorsMap.get(actorId)!;
          if (!actor.cases.includes(`corruption-${caseItem.id}`)) {
            actor.cases.push(`corruption-${caseItem.id}`);
          }
        }
      });

      // Create connections between actors in the same case
      const caseActorIds = caseItem.keyFiguresDetails.map(figure => 
        figure.name.toLowerCase().replace(/\s+/g, '-')
      );

      // Connect all actors in this case to each other
      caseActorIds.forEach(actorId => {
        const connections = connectionsMap.get(actorId)!;
        caseActorIds.forEach(otherId => {
          if (actorId !== otherId) {
            connections.add(otherId);
          }
        });
      });
    }
  });

  // Set connections for each actor
  connectionsMap.forEach((connections, actorId) => {
    const actor = actorsMap.get(actorId)!;
    actor.connections = Array.from(connections);
  });

  return Array.from(actorsMap.values());
};

export const actors = extractActorsFromCases();

// Add some additional manual connections for more interesting visualization
// These could represent known associations outside of the cases
actors.forEach(actor => {
  // Example: Connect some high-profile actors across different case types
  if (actor.id === 'setya-novanto') {
    const additionalConnections = ['robert-tantular', 'bambang-sutrisno'];
    actor.connections = [...new Set([...actor.connections, ...additionalConnections])];
  }
  
  if (actor.id === 'freddy-budiman') {
    const additionalConnections = ['doni-salmanan', 'indra-kenz'];
    actor.connections = [...new Set([...actor.connections, ...additionalConnections])];
  }
});

/**
 * Get an actor by ID
 */
export function getActorById(id: string): Actor | undefined {
  return actors.find(actor => actor.id === id);
}

// Function to get cases for an actor
export const getCasesForActor = (actorId: string) => {
  const actor = getActorById(actorId);
  if (!actor) return [];
  
  return actor.cases.map(caseId => {
    if (caseId.startsWith('corruption-')) {
      const id = caseId.replace('corruption-', '');
      const caseItem = corruptionCases.find(c => c.id === id);
      return caseItem ? { ...caseItem, type: 'corruption' } : null;
    } else {
      const caseItem = cases.find(c => c.id === caseId);
      return caseItem || null;
    }
  }).filter(Boolean);
};

// Function to get connected actors
export const getConnectedActors = (actorId: string) => {
  const actor = getActorById(actorId);
  if (!actor) return [];
  
  return actor.connections.map(id => getActorById(id)).filter(Boolean) as Actor[];
}; 