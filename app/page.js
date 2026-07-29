import HomeClient from './HomeClient'
import PageView from '../src/components/PageView'
import { getPageMarkdown } from '../src/utils/getPageMarkdown'

export default function Home() {
    return (
        <PageView page="home" markdown={getPageMarkdown('home')}>
            <HomeClient />
        </PageView>
    )
}
