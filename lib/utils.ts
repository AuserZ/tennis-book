import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, parseISO } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Safely formats a time string into a readable format (h:mm a)
 * Handles both ISO strings and HH:mm format
 */
export const formatTime = (timeString: string) => {
  try {
    // First try parsing as ISO string
    const date = parseISO(timeString)
    if (isNaN(date.getTime())) {
      // If not valid ISO, try parsing as time string (HH:mm)
      const [hours, minutes] = timeString.split(':')
      const date = new Date()
      date.setHours(parseInt(hours, 10))
      date.setMinutes(parseInt(minutes, 10))
      return format(date, "h:mm a")
    }
    return format(date, "h:mm a")
  } catch (error) {
    console.error('Error formatting time:', timeString, error)
    return timeString // Return original string if formatting fails
  }
}
