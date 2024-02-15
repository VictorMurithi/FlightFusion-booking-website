"""added columns in flights and flightpassenger

Revision ID: a269664b20ad
Revises: 
Create Date: 2024-02-14 15:01:40.136117

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a269664b20ad'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('airports',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('city', sa.String(length=100), nullable=False),
    sa.Column('country', sa.String(length=100), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('email', sa.String(length=30), nullable=False),
    sa.Column('phone', sa.String(length=15), nullable=False),
    sa.Column('password_hash', sa.String(length=450), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('phone')
    )
    op.create_table('flights',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('airline', sa.String(length=100), nullable=False),
    sa.Column('flight_class', sa.String(length=100), nullable=False),
    sa.Column('destination', sa.String(length=100), nullable=False),
    sa.Column('arrival_time', sa.DateTime(), nullable=False),
    sa.Column('departure_time', sa.DateTime(), nullable=False),
    sa.Column('price', sa.Float(), nullable=False),
    sa.Column('departure_airport_id', sa.Integer(), nullable=False),
    sa.Column('arrival_airport_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['arrival_airport_id'], ['airports.id'], ),
    sa.ForeignKeyConstraint(['departure_airport_id'], ['airports.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('bookings',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('flight_id', sa.Integer(), nullable=False),
    sa.Column('booking_datetime', sa.DateTime(), nullable=False),
    sa.Column('departure_datetime', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['flight_id'], ['flights.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('flight_passengers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('flight_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('seat_number', sa.String(length=100), nullable=False),
    sa.ForeignKeyConstraint(['flight_id'], ['flights.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('flight_passengers')
    op.drop_table('bookings')
    op.drop_table('flights')
    op.drop_table('users')
    op.drop_table('airports')
    # ### end Alembic commands ###