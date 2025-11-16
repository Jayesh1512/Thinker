import { useState, useEffect, useCallback } from 'react';

interface UseFormProgressOptions {
  storageKey?: string;
  autoSave?: boolean;
}

/**
 * Custom hook for managing multi-step form progress with localStorage
 */
export function useFormProgress<T extends Record<string, any>>(
  initialData: T,
  options: UseFormProgressOptions = {}
) {
  const { storageKey = 'formData', autoSave = true } = options;

  const [formData, setFormData] = useState<T>(initialData);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          const parsed = JSON.parse(saved);
          setFormData({ ...initialData, ...parsed });
        }
      } catch (error) {
        console.error('Error loading form data from localStorage:', error);
      }
      setIsLoaded(true);
    }
  }, [storageKey, initialData]);

  // Save to localStorage whenever formData changes
  useEffect(() => {
    if (isLoaded && autoSave && typeof window !== 'undefined') {
      try {
        localStorage.setItem(storageKey, JSON.stringify(formData));
      } catch (error) {
        console.error('Error saving form data to localStorage:', error);
      }
    }
  }, [formData, isLoaded, autoSave, storageKey]);

  // Update a specific field
  const updateField = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  // Update multiple fields
  const updateFields = useCallback((updates: Partial<T>) => {
    setFormData((prev) => ({
      ...prev,
      ...updates,
    }));
  }, []);

  // Reset form data
  const resetForm = useCallback(() => {
    setFormData(initialData);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(storageKey);
    }
  }, [initialData, storageKey]);

  // Clear localStorage but keep current state
  const clearStorage = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(storageKey);
    }
  }, [storageKey]);

  return {
    formData,
    setFormData,
    updateField,
    updateFields,
    resetForm,
    clearStorage,
    isLoaded,
  };
}
