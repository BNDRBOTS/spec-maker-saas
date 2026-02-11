'use client'

import { motion } from 'framer-motion'
import { Code, Smartphone, Globe, Database, Zap } from 'lucide-react'
import { useSpecStore } from '@/lib/store'

const TEMPLATES = [
  {
    id: 'web-app',
    name: 'Web Application',
    icon: Globe,
    description: 'Full-stack web app with modern frameworks',
    color: 'from-blue-500 to-cyan-500',
    features: ['Frontend & Backend', 'Database Design', 'API Specification', 'Auth & Security'],
  },
  {
    id: 'mobile-app',
    name: 'Mobile Application',
    icon: Smartphone,
    description: 'Native or cross-platform mobile app',
    color: 'from-purple-500 to-pink-500',
    features: ['iOS & Android', 'Push Notifications', 'Offline Support', 'App Store Ready'],
  },
  {
    id: 'api-service',
    name: 'API Service',
    icon: Database,
    description: 'RESTful or GraphQL API backend',
    color: 'from-green-500 to-emerald-500',
    features: ['Endpoint Design', 'Data Models', 'Rate Limiting', 'Documentation'],
  },
  {
    id: 'saas-platform',
    name: 'SaaS Platform',
    icon: Zap,
    description: 'Multi-tenant SaaS with billing',
    color: 'from-orange-500 to-red-500',
    features: ['Multi-Tenancy', 'Subscription Billing', 'Admin Dashboard', 'Analytics'],
  },
  {
    id: 'custom',
    name: 'Start From Scratch',
    icon: Code,
    description: 'Build your own custom template',
    color: 'from-gray-600 to-gray-800',
    features: ['Complete Flexibility', 'All Features Available', 'Custom Workflows', 'Your Rules'],
  },
]

export function TemplateSelector({ onSelect }: { onSelect: (id: string) => void }) {
  const setTemplate = useSpecStore(state => state.setTemplate)

  const handleSelect = (templateId: string) => {
    setTemplate(templateId)
    onSelect(templateId)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {TEMPLATES.map((template, index) => {
        const Icon = template.icon
        return (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            onClick={() => handleSelect(template.id)}
            className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow cursor-pointer overflow-hidden group"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
            <div className="p-8">
              <div className={`w-16 h-16 bg-gradient-to-br ${template.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{template.name}</h3>
              <p className="text-gray-600 mb-6">{template.description}</p>
              <ul className="space-y-2">
                {template.features.map(feature => (
                  <li key={feature} className="flex items-center text-sm text-gray-700">
                    <div className={`w-1.5 h-1.5 bg-gradient-to-br ${template.color} rounded-full mr-2`} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${template.color}`} />
          </motion.div>
        )
      })}
    </div>
  )
}