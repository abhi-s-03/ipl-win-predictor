# IPL Win Predictor

A machine learning-powered web application that predicts the win probability for IPL (Indian Premier League) cricket matches during the second innings.

## Features

- Real-time win probability prediction for ongoing IPL matches
- Support for all current IPL teams
- Comprehensive venue selection across India and UAE
- Responsive design that works on both mobile and desktop
- Interactive form with validation for match statistics

## Tech Stack

### Frontend
- React.js with Vite
- TailwindCSS for styling
- Lucide React for icons
- ESLint for code quality

### Backend
- Flask for API server
- Scikit-learn for ML model
- Pandas for data processing
- Joblib for model serialization
- Flask-CORS for cross-origin support

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Python 3.11 or higher
- pip (Python package manager)

### Installation

1. Clone the repository
``````
git clone https://github.com/yourusername/ipl-win-predictor.git
``````
2. Navigate to the repository directory by running this command in your terminal:
``````
    cd ipl-win-predictor
``````
3. Frontend Setup
``````
    cd frontend
    pnpm install
    pnpm run dev
``````
4. Backend Setup
``````
    cd ..
    cd Backend
    pip install -r requirements.txt
    python app.py
``````


## Usage

1. Enter the first innings details:
   - Select the team
   - Choose the match venue
   - Enter the first innings score
   - Enter the wickets lost

2. Enter the second innings details:
   - Select the batting team
   - Enter current over (0.0 to 20.0)
   - Enter current score
   - Enter wickets lost

3. Click "Calculate Prediction" to see the win probabilities for both teams

## Model Details

The prediction model uses Logistic Regression with the following features:
- Match venue
- Batting team
- Bowling team
- Target score
- Required runs
- Balls remaining
- Wickets left
- Current run rate
- Required run rate


## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- IPL match data used for training the model
- Scikit-learn library for machine learning implementation
- React and Flask communities for excellent documentation
