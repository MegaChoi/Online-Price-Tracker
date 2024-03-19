FROM ubuntu:latest

# Install cron and pip
RUN apt-get update && apt-get install -y cron python3-pip && apt-get install -y libpq-dev
RUN apt -f install -y
RUN apt-get install -y wget
RUN wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt-get install ./google-chrome-stable_current_amd64.deb -y
# Create the log file
RUN touch /var/log/cron.log

# Setup cron job
# RUN (crontab -l ; echo "* * * * * echo 'Hello World' >> /var/log/cron.log 2>&1") | crontab -

# Set working directory for the Python application
WORKDIR /usr/app

# Copy the entire Django project
COPY . /usr/app

# Install Python dependencies
RUN pip install -r requirements.txt

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Start cron service
RUN service cron start 

# Run the command on container startup
CMD python3 manage.py runserver 0.0.0.0:8000

