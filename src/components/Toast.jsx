import { useState, useEffect } from 'react';
import { X, CheckCircle, AlertTriangle } from 'lucide-react';
import './Toast.css';

export default function Toast({ message, type = 'success', visible, onClose, duration = 6000 }) {
  useEffect(() => {
    if (visible && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onClose]);

  if (!visible) return null;

  return (
    <div className={`toast toast-${type} ${visible ? 'show' : ''}`}>
      <div className="toast-icon">
        {type === 'success' ? <CheckCircle size={18} /> : <AlertTriangle size={18} />}
      </div>
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={onClose}><X size={14} /></button>
    </div>
  );
}
