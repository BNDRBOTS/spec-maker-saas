'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Rocket, CheckCircle2, Download, Share2 } from 'lucide-react'
import Confetti from 'react-confetti'
import { TemplateSelector } from './TemplateSelector'
import { SpecWizard } from './SpecWizard'
import { CompletionScore } from './CompletionScore'
import { ChecklistPanel } from './ChecklistPanel'
import { useSpecStore } from '@/lib/store'

type Step = 'template' | 'wizard' | 'review' | 'complete'

export function SpecMaker() {
  const [step, setStep] = useState<Step>('template')
  const [showConfetti, setShowConfetti] = useState(false)
  const { spec, completionScore } = useSpecStore()

  const handleTemplateSelect = (templateId: string) => {
    setStep('wizard')
  }

  const handleWizardComplete = () => {
    setStep('review')
  }

  const handleGenerate = async () => {
    setShowConfetti(true)
    setStep('complete')
    setTimeout(() => setShowConfetti(false), 5000)
  }

  return (
    <div className="relative min-h-screen">
      {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}
      
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-gray-200"
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Spec Maker
            </h1>
          </div>
          {step !== 'template' && (
            <CompletionScore score={completionScore} />
          )}
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {step === 'template' && (
            <motion.div
              key="template"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-12">
                <motion.h2
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                >
                  Build Your Perfect Spec
                </motion.h2>
                <p className="text-xl text-gray-600">
                  Choose a template and let's create something amazing together
                </p>
              </div>
              <TemplateSelector onSelect={handleTemplateSelect} />
            </motion.div>
          )}

          {step === 'wizard' && (
            <motion.div
              key="wizard"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              <SpecWizard onComplete={handleWizardComplete} />
            </motion.div>
          )}

          {step === 'review' && (
            <motion.div
              key="review"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl mx-auto"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold mb-6">Review Your Spec</h2>
                <ChecklistPanel />
                <div className="mt-8 flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleGenerate}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
                  >
                    <Rocket className="w-5 h-5" />
                    Generate Complete Spec
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setStep('wizard')}
                    className="px-6 py-4 border-2 border-gray-300 rounded-xl font-semibold hover:border-gray-400 transition-colors"
                  >
                    Back to Edit
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="mb-8"
              >
                <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full mx-auto flex items-center justify-center shadow-2xl">
                  <CheckCircle2 className="w-20 h-20 text-white" />
                </div>
              </motion.div>
              <h2 className="celebration-text mb-4">Spec Complete!</h2>
              <p className="text-xl text-gray-600 mb-12">
                Your production-ready specification is ready to download
              </p>
              <div className="flex gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Spec
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-indigo-600 text-indigo-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-50 transition-colors flex items-center gap-2"
                >
                  <Share2 className="w-5 h-5" />
                  Share
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}