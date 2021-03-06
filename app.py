from flask import Flask, render_template
from neo4j import GraphDatabase, basic_auth
app = Flask(__name__)


def makeQuery(q):
    driver = GraphDatabase.driver(
      "bolt://3.236.43.173:7687",
      auth=basic_auth("neo4j", "roads-post-countries"))
    cypher_query = q
    with driver.session(database="neo4j") as session:
      results = session.read_transaction(
        lambda tx: tx.run(cypher_query).data())
    driver.close()
    return results


@app.route('/')
def main():
    """yoooooooo"""
    print("hi")
    results = makeQuery('''
        MATCH (n:Text)
        RETURN n
        ''')
    books = [(record['n']) for record in results]
    writresults = makeQuery('''
            MATCH (n:Author)
            RETURN n
            ''')
    writer = [(record['n']) for record in writresults]
    genrelinks = makeQuery('''
                        Match (n :Genre)-[r :Genre]->(n2 :Text) 
                        RETURN r.start, r.end
                        ''')
    genresresults = makeQuery('''
                MATCH (n:Genre)
                RETURN n
                ''')
    genres = [(record['n']) for record in genresresults]
    influences = makeQuery('''
                            Match (n :Text)-[r :INFLUENCED]->(n2 :Text) 
                            RETURN r.start, r.end, r.Influence
                            ''')
    wrote = makeQuery('''
                        Match (n :Author)-[r :WROTE]->(n2 :Text)
                        RETURN r.start, r.end
                        ''')
    print(influences[0]['r.start'][0])
    print(books[0])
    print(writer[3]['name'])
    print(genrelinks)
    return render_template('graph.html',
                           books=books,
                           influences=influences,
                           writer=writer,
                           wrote=wrote,
                           genres=genres,
                           genrelinks=genrelinks
                           )



@app.route('/text/<string:text_name>')
def text(text_name):
    q = '''
    MATCH (n:Text {name: '%s'})
    RETURN n
    ''' % (str(text_name))
    text_record = makeQuery(q)
    print(text_record)
    return render_template('text.html', text_name=text_name, text_record=text_record)


@app.route('/writers/<string:writer_name>')
def writer(writer_name):
    q = '''
    MATCH (n:Author {name: '%s'})
    RETURN n
    ''' % (str(writer_name))
    writer_record = makeQuery(q)
    print(writer_record)
    return render_template('writer.html', writer_name=writer_name, writer_record=writer_record)


@app.route('/genres/<string:genre_name>')
def genres(genre_name):
    q = '''
    MATCH (n:Genre {name: '%s'})
    RETURN n
    ''' % (str(genre_name))
    genre_record = makeQuery(q)
    print(genre_record)
    return render_template('genre.html', genre_name=genre_name, genre_record=genre_record)

if __name__ == '__main__':
    app.run(debug=True, use_debugger=False, use_reloader=False, passthrough_errors=True)
