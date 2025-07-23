// Configuration de distribution des revenus Iluma™
import { RoleAssignment, IlumaRole } from '@/types/crm.ts';
import { getIlumaRoleColor } from './collaboratorColors';

export const defaultIlumaDistribution: RoleAssignment[] = [
  {
    role: 'ceo',
    assignedTo: 'Sergio',
    percentage: 10,
    description: '🧠 Dirección General / CEO',
    color: getIlumaRoleColor('ceo').primary
  },
  {
    role: 'coo',
    assignedTo: 'Amparo',
    percentage: 10,
    description: '💛 Dirección de Operaciones / COO',
    color: getIlumaRoleColor('coo').primary
  },
  {
    role: 'developer',
    assignedTo: 'J-C',
    percentage: 10,
    description: '👨‍💻 Desarrollo Técnico / Programación',
    color: getIlumaRoleColor('developer').primary
  },
  {
    role: 'social_media',
    assignedTo: 'Belén',
    percentage: 10,
    description: '📲 Coordinación de Medios Sociales',
    color: getIlumaRoleColor('social_media').primary
  },
  {
    role: 'partnerships',
    assignedTo: '—',
    percentage: 10,
    description: '🔗 Estrategia de Alianzas & Backlinking',
    color: getIlumaRoleColor('partnerships').primary
  },
  {
    role: 'technical_support',
    assignedTo: 'Andrea',
    percentage: 10,
    description: '🧰 Soporte Técnico y Automatización',
    color: getIlumaRoleColor('technical_support').primary
  },
  {
    role: 'creative_design',
    assignedTo: '—',
    percentage: 10,
    description: '🎨 Dirección Creativa y Visual (UI/UX, diseño)',
    color: getIlumaRoleColor('creative_design').primary
  },
  {
    role: 'digital_tools',
    assignedTo: '—',
    percentage: 10,
    description: '⚙️ Gestión de Herramientas Digitales (IA, CRM, sistemas)',
    color: getIlumaRoleColor('digital_tools').primary
  },
  {
    role: 'strategic_reserve',
    assignedTo: 'system',
    percentage: 10,
    description: '🎁 Reserva Estratégica (bonificaciones, software, etc.)',
    color: getIlumaRoleColor('strategic_reserve').primary
  },
  {
    role: 'fixed_costs',
    assignedTo: 'system',
    percentage: 10,
    description: '🧾 Costos Fijos (licencias, IA, dominios, impuestos)',
    color: getIlumaRoleColor('fixed_costs').primary
  }
];

export const getRoleDisplayName = (role: IlumaRole): string => {
  const roleMap: Record<IlumaRole, string> = {
    'ceo': 'Dirección General',
    'coo': 'Dirección de Operaciones',
    'developer': 'Desarrollo Técnico',
    'social_media': 'Medios Sociales',
    'partnerships': 'Alianzas & Backlinking',
    'technical_support': 'Soporte Técnico',
    'creative_design': 'Dirección Creativa',
    'digital_tools': 'Herramientas Digitales',
    'strategic_reserve': 'Reserva Estratégica',
    'fixed_costs': 'Costos Fijos'
  };
  
  return roleMap[role] || role;
};

export const getRoleIcon = (role: IlumaRole): string => {
  const iconMap: Record<IlumaRole, string> = {
    'ceo': '🧠',
    'coo': '💛',
    'developer': '👨‍💻',
    'social_media': '📲',
    'partnerships': '🔗',
    'technical_support': '🧰',
    'creative_design': '🎨',
    'digital_tools': '⚙️',
    'strategic_reserve': '🎁',
    'fixed_costs': '🧾'
  };
  
  return iconMap[role] || '⭐';
};

export const calculateDistribution = (totalRevenue: number, assignments: RoleAssignment[]) => {
  return assignments.map(assignment => ({
    ...assignment,
    amount: (totalRevenue * assignment.percentage) / 100
  }));
};

export const getStrategicReservePriorities = () => [
  {
    id: 'tools',
    name: 'Herramientas y Licencias',
    description: 'Lovable™, Ahrefs, Midjourney, IA, dominios',
    priority: 1,
    icon: '🛠️'
  },
  {
    id: 'additional_coo',
    name: 'Remuneración adicional COO',
    description: 'Amparo - trabajo estratégico adicional',
    priority: 2,
    icon: '💛'
  },
  {
    id: 'additional_ceo',
    name: 'Remuneración adicional CEO',
    description: 'Sergio - trabajo estratégico adicional',
    priority: 3,
    icon: '🧠'
  },
  {
    id: 'quarterly_bonuses',
    name: 'Bonificaciones Trimestrales',
    description: 'Sistema de bonos cada 4 meses según mérito',
    priority: 4,
    icon: '🎁'
  }
];