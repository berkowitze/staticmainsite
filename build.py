import json
from typing import List
from jinja2 import Environment, FileSystemLoader

env = Environment(loader=FileSystemLoader('templates'))
template = env.get_template('index_template.jhtml')
mobile_template = env.get_template('mobile_template.jhtml')


class Config:
    page_author = 'Elias Berkowitz'
    first_name = 'Elias'
    last_name = 'Berkowitz'
    full_name = first_name + ' ' + last_name
    email = 'eliberkowitz@gmail.com'
    tags = [full_name, last_name, 'Eli Berkowitz', 'Programming',
            'Applied Mathematics', 'Computer Science Education',
            'Education']

    sub_pages = [('about.jhtml', 'About'),
                 ('resume.jhtml', 'Resum&eacute;'),
                 ('projects.jhtml', 'Projects'),
                 ('contact.jhtml', 'Contact')
                 ]

    projects = [
                ('grading-app',
                 'grading_app.jhtml',
                 'Grading app for computer science courses at Brown University [Flask]'
                 ),

                ('exosim',
                 'exosim.jhtml',
                 'Create and observe your own solar system [p5.js]'
                 ),

                ('thrust-test',
                 'thrust_test_app.jhtml',
                 ('Flask web app developed to provide an API for testing '
                  'rocket motors and visualizing thrust results [Flask, Raspberry Pi]')
                 ),

                ('hveto',
                 'hveto.jhtml',
                 ('Work for LIGO '
                  '(Laser Interfrometric Gravitational-Wave Observatory) [Python]')
                 ),

                ('oakwood',
                 'oakwood.jhtml',
                 'Internal-use web apps for Oakwood Friends School [Google Apps Script]'),

                ('this_site',
                 'this_site.jhtml',
                 'This website [Python, Jinja, Netlify]'),

                ('melanie-falick',
                 'melanie_falick.jhtml',
                 'Redesign of Melanie Falick\'s website [Squarespace]'),

                ('life-percent',
                 'life_percent.jhtml',
                 ('Life Percent Website: Shows the '
                  'user the percent of their life that has passed [Javascript]')
                 )
                ]


rendered_template = template.render(config=Config, mobile=False)
rendered_mobile = mobile_template.render(config=Config, mobile=True)

with open('index.html', 'w') as f:
    f.write(rendered_template)

with open('mobile.html', 'w') as f:
    f.write(rendered_mobile)

print('recompiled')
