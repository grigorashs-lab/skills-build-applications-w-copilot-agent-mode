from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from djongo import models


from pymongo import MongoClient

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Connect to MongoDB directly for index creation
        client = MongoClient('localhost', 27017)
        db = client['octofit_db']
        db.users.drop()
        db.teams.drop()
        db.activities.drop()
        db.leaderboard.drop()
        db.workouts.drop()
        db.users.create_index([('email', 1)], unique=True)

        # Sample users (superheroes)
        users = [
            {"name": "Tony Stark", "email": "ironman@marvel.com", "team": "Marvel"},
            {"name": "Steve Rogers", "email": "cap@marvel.com", "team": "Marvel"},
            {"name": "Bruce Wayne", "email": "batman@dc.com", "team": "DC"},
            {"name": "Clark Kent", "email": "superman@dc.com", "team": "DC"},
        ]
        db.users.insert_many(users)

        # Teams
        teams = [
            {"name": "Marvel", "members": ["ironman@marvel.com", "cap@marvel.com"]},
            {"name": "DC", "members": ["batman@dc.com", "superman@dc.com"]},
        ]
        db.teams.insert_many(teams)

        # Activities
        activities = [
            {"user_email": "ironman@marvel.com", "activity": "Running", "duration": 30},
            {"user_email": "cap@marvel.com", "activity": "Cycling", "duration": 45},
            {"user_email": "batman@dc.com", "activity": "Swimming", "duration": 60},
            {"user_email": "superman@dc.com", "activity": "Flying", "duration": 120},
        ]
        db.activities.insert_many(activities)

        # Leaderboard
        leaderboard = [
            {"team": "Marvel", "points": 150},
            {"team": "DC", "points": 180},
        ]
        db.leaderboard.insert_many(leaderboard)

        # Workouts
        workouts = [
            {"name": "Super Strength", "suggested_for": "DC"},
            {"name": "Agility Training", "suggested_for": "Marvel"},
        ]
        db.workouts.insert_many(workouts)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with superhero test data.'))
