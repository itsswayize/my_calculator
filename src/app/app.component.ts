import { Component, OnInit, HostListener } from '@angular/core'; // Added HostListener
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'modern-calculator';
  displayValue: string = '0';
  currentExpression: string = '';
  history: Array<{ date: string, expression: string, result: string }> = [];

  // Listen for global keyboard events
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const key = event.key;

    // Numbers and Decimal
    if (/[0-9.]/.test(key)) {
      this.onKeyClick(key);
    } 
    // Basic Operators
    else if (['+', '-'].includes(key)) {
      this.onKeyClick(key);
    } 
    // Multiplication
    else if (key === '*') {
      this.onKeyClick('×');
    } 
    // Division (Prevent browser "Quick Find")
    else if (key === '/') {
      event.preventDefault();
      this.onKeyClick('÷');
    }
    // Equals / Calculate
    else if (key === 'Enter' || key === '=') {
      event.preventDefault();
      this.calculate();
    }
    // Backspace to delete last character
    else if (key === 'Backspace') {
      this.onKeyClick('Backspace');
    }
    // Delete key to clear the screen
    else if (key === 'Delete') {
      this.clear();
    }
  }

  ngOnInit() {
    const savedHistory = localStorage.getItem('calc_history');
    if (savedHistory) {
      this.history = JSON.parse(savedHistory);
    }
  }

  onKeyClick(value: string) {
    if (value === 'Backspace') {
      this.displayValue = this.displayValue.length > 1 
        ? this.displayValue.slice(0, -1) 
        : '0';
      return;
    }

    if (this.displayValue === '0' && !isNaN(Number(value))) {
      this.displayValue = value;
    } else {
      this.displayValue += value;
    }
  }

  clear() {
    this.displayValue = '0';
    this.currentExpression = '';
  }

  clearHistory() {
    this.history = [];
    localStorage.removeItem('calc_history');
  }

  calculate() {
    try {
      const sanitizedFormula = this.displayValue
        .replace(/×/g, '*')
        .replace(/÷/g, '/');

      const result = new Function(`return ${sanitizedFormula}`)();

      this.currentExpression = this.displayValue;
      
      this.history.unshift({
        date: new Date().toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        }),
        expression: this.displayValue,
        result: result.toString()
      });

      localStorage.setItem('calc_history', JSON.stringify(this.history));
      this.displayValue = result.toString();
      
    } catch (e) {
      this.displayValue = 'Error';
    }
  }
}