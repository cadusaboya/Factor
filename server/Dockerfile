# Use an appropriate base image
FROM python:3.12.3

# Set the working directory in the container
WORKDIR /app

# Install any system dependencies, if needed

# Copy the requirements file into the container at /app
COPY requirements.txt ./

# Install Python dependencies
RUN pip install -r requirements.txt

# Copy the backend application code into the container at /app
COPY . .

# Expose port 8000 to the outside world
EXPOSE 8000

# Command to run the backend application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]